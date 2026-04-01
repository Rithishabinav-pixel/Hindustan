"use client";
import { useEffect, useState } from "react";
import style from "./FloatingNotification.module.css";

/**
 * FloatingNotification
 *
 * Props:
 *   show     {boolean}  — trigger visibility
 *   title    {string}   — bold heading
 *   message  {string}   — supporting text
 *   type     {'success'|'error'}  — controls accent color (default: 'success')
 *   duration {number}   — ms before auto-hide (default: 3000, 0 = stay)
 *   onHide   {function} — optional callback after the notification hides
 */
export default function FloatingNotification({
  show = false,
  title = "Success",
  message = "",
  type = "success",
  duration = 3000,
  onHide,
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!show) {
      setVisible(false);
      return;
    }
    setVisible(true);

    if (duration > 0) {
      const timer = setTimeout(() => {
        setVisible(false);
        onHide?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onHide]);

  const isError = type === "error";

  return (
    <div className={`${style.wrapper} ${visible ? style.visible : ""}`} role="status" aria-live="polite">
      <div className={`${style.card} ${isError ? style.error : ""}`}>
        <div className={`${style.iconWrap} ${isError ? style.error : ""}`}>
          {isError ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e53e3e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#148F3F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </div>
        <div className={style.text}>
          <span className={style.title}>{title}</span>
          {message && <span className={style.message}>{message}</span>}
        </div>
      </div>
    </div>
  );
}
