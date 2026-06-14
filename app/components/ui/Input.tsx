"use client";

import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: string;
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "13px",
  fontWeight: 600,
  marginBottom: "6px",
  color: "var(--text-muted)",
};

const inputBase: React.CSSProperties = {
  width: "100%",
  background: "var(--input-bg)",
  color: "var(--text)",
  border: "1px solid var(--border)",
  borderRadius: "10px",
  padding: "10px 14px",
  fontSize: "14px",
  fontFamily: "inherit",
  outline: "none",
  transition: "border-color 0.15s",
};

const errorStyle: React.CSSProperties = {
  marginTop: "4px",
  fontSize: "12px",
  color: "#ef4444",
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, style, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        {label && <label htmlFor={inputId} style={labelStyle}>{label}</label>}
        <div style={{ position: "relative" }}>
          {icon && (
            <i
              className={`ti ${icon}`}
              style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--text-faint)",
                fontSize: "16px",
                pointerEvents: "none",
              }}
            />
          )}
          <input
            ref={ref}
            id={inputId}
            style={{
              ...inputBase,
              paddingLeft: icon ? "36px" : "14px",
              borderColor: error ? "#ef4444" : undefined,
              ...style,
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = "var(--primary)"; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = error ? "#ef4444" : "var(--border)"; }}
            {...props}
          />
        </div>
        {error && <span style={errorStyle}>{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, style, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        {label && <label htmlFor={inputId} style={labelStyle}>{label}</label>}
        <textarea
          ref={ref}
          id={inputId}
          style={{
            ...inputBase,
            resize: "vertical",
            minHeight: "100px",
            borderColor: error ? "#ef4444" : undefined,
            ...style,
          }}
          onFocus={(e) => { e.currentTarget.style.borderColor = "var(--primary)"; }}
          onBlur={(e) => { e.currentTarget.style.borderColor = error ? "#ef4444" : "var(--border)"; }}
          {...props}
        />
        {error && <span style={errorStyle}>{error}</span>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
