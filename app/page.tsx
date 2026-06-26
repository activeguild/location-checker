"use client";

import { useEffect, useState } from "react";

type Status = "loading" | "ok" | "ng";

export default function Home() {
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    if (!navigator.geolocation) {
      setStatus("ng");
      return;
    }

    navigator.permissions
      .query({ name: "geolocation" })
      .then((result) => {
        if (result.state === "granted") {
          setStatus("ok");
        } else if (result.state === "denied") {
          setStatus("ng");
        } else {
          // "prompt" — まだ許可していないので初回のみ聞く
          navigator.geolocation.getCurrentPosition(
            () => setStatus("ok"),
            () => setStatus("ng")
          );
        }

        result.addEventListener("change", () => {
          if (result.state === "granted") setStatus("ok");
          else if (result.state === "denied") setStatus("ng");
        });
      })
      .catch(() => {
        // Permissions API非対応の場合はフォールバック
        navigator.geolocation.getCurrentPosition(
          () => setStatus("ok"),
          () => setStatus("ng")
        );
      });
  }, []);

  const label = {
    loading: "位置情報を確認中...",
    ok: "位置情報OK",
    ng: "位置情報NG",
  }[status];

  return (
    <main className="container">
      {status === "loading" && <div className="spinner" />}
      <div className={`status ${status}`}>{label}</div>
    </main>
  );
}
