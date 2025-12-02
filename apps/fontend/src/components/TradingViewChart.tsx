
import React, { useEffect, useRef } from "react";
import {
  createChart,
  ColorType,
  type UTCTimestamp,
  type IChartApi,
  type ISeriesApi,
} from "lightweight-charts";

export interface CandleData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface ChartProps {
  data: CandleData[];
  height?: number;
}

function toTimestamp(str: string): UTCTimestamp {
  return (new Date(str.replace(" ", "T")).getTime() / 1000) as UTCTimestamp;
}

export function TradingViewChart({ data, height = 500 }: ChartProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const chartRef = useRef<IChartApi | null>(null);
  const candleSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const volumeSeriesRef = useRef<ISeriesApi<"Histogram"> | null>(null);

  const lastTimeRef = useRef<number | null>(null);
  const initRef = useRef(false);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  // INIT CHART
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (chartRef.current) return;

    const chart = createChart(container, {
      width: container.clientWidth,
      height,
      layout: {
        background: { type: ColorType.Solid, color: isDark ? "#1e293b" : "#ffffff" },
        textColor: isDark ? "#e2e8f0" : "#1e293b",
      },
      grid: {
        vertLines: { visible: false },
        horzLines: { visible: false },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: true,
        rightOffset: 2,
        barSpacing: 8,
      },
    });

    chartRef.current = chart;

    // Candle Series
    candleSeriesRef.current = chart.addCandlestickSeries({
      upColor: "#22c55e",
      downColor: "#ef4444",
      borderUpColor: "#22c55e",
      borderDownColor: "#ef4444",
      wickUpColor: "#22c55e",
      wickDownColor: "#ef4444",
    });

    // Volume series
    volumeSeriesRef.current = chart.addHistogramSeries({
      priceScaleId: "",
      priceFormat: { type: "volume" },
    });

    volumeSeriesRef.current.priceScale().applyOptions({
      scaleMargins: { top: 0.75, bottom: 0 },
    });

    // Resize handling
    const ro = new ResizeObserver(() => {
      if (chartRef.current && containerRef.current) {
        chartRef.current.applyOptions({
          width: containerRef.current.clientWidth,
          height,
        });
      }
    });

    ro.observe(container);
    resizeObserverRef.current = ro;

    return () => {
      resizeObserverRef.current?.disconnect();
      resizeObserverRef.current = null;

      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }

      initRef.current = false;
    };
  }, [height, isDark]);

  // LIVE UPDATE
  useEffect(() => {
    if (!data.length) return;
    if (!candleSeriesRef.current || !volumeSeriesRef.current) return;

    const formatted = data.map((d) => ({
      time: toTimestamp(d.time),
      open: d.open,
      high: d.high,
      low: d.low,
      close: d.close,
    }));

    const vol = data.map((d) => ({
      time: toTimestamp(d.time),
      value: d.volume,
      color: d.close >= d.open ? "rgba(34,197,94,0.4)" : "rgba(239,68,68,0.4)",
    }));

    const lastBar = formatted[formatted.length - 1];
    const lastVolBar = vol[vol.length - 1];
    const currentLastTime = lastBar.time;

    // First load or pair switch → reset full data
    if (!initRef.current || lastTimeRef.current === null || currentLastTime < lastTimeRef.current) {
      candleSeriesRef.current.setData(formatted);
      volumeSeriesRef.current.setData(vol);

      initRef.current = true;
      lastTimeRef.current = currentLastTime;

      chartRef.current?.timeScale().fitContent();
      return;
    }

    // Live updating
    candleSeriesRef.current.update(lastBar);
    volumeSeriesRef.current.update(lastVolBar);
    lastTimeRef.current = currentLastTime;
  }, [data]);

  return <div ref={containerRef} className="w-full" />;
}
