"use client";

import type { BoxSize } from "@/lib/pricing";

/**
 * A to-scale 3D model of the selected parcel.
 *
 * Six faces under `transform-style: preserve-3d` — no canvas, no WebGL,
 * no dependency. Every face is sized in centimetres times `--box-scale`
 * (set in globals.css), which means the three boxes are proportioned
 * correctly against each other rather than each drawn to fit: an XXL is
 * visibly longer than an M because it is.
 *
 * Changing the selected size retargets the same six faces, so the CSS
 * transition on width/height/transform reads as one box growing rather
 * than a swap between two pictures. The spin, and that tween, both stop
 * under `prefers-reduced-motion`.
 */
export default function BoxModel({ box }: { box: BoxSize }) {
  // cm -> css length, at whatever scale the viewport is using.
  const u = (cm: number) => `calc(var(--box-scale) * ${cm})`;

  // Each face is centred on the cube's origin first, then rotated into
  // place and pushed out by half the depth it faces.
  const faces = [
    {
      key: "front",
      w: box.w,
      h: box.h,
      t: `translate(-50%,-50%) translateZ(${u(box.d / 2)})`,
      bg: "#cfa87d",
    },
    {
      key: "back",
      w: box.w,
      h: box.h,
      t: `translate(-50%,-50%) rotateY(180deg) translateZ(${u(box.d / 2)})`,
      bg: "#b1875d",
    },
    {
      key: "right",
      w: box.d,
      h: box.h,
      t: `translate(-50%,-50%) rotateY(90deg) translateZ(${u(box.w / 2)})`,
      bg: "#bb9269",
    },
    {
      key: "left",
      w: box.d,
      h: box.h,
      t: `translate(-50%,-50%) rotateY(-90deg) translateZ(${u(box.w / 2)})`,
      bg: "#bb9269",
    },
    {
      key: "top",
      w: box.w,
      h: box.d,
      t: `translate(-50%,-50%) rotateX(90deg) translateZ(${u(box.h / 2)})`,
      bg: "#dcb98f",
    },
    {
      key: "bottom",
      w: box.w,
      h: box.d,
      t: `translate(-50%,-50%) rotateX(-90deg) translateZ(${u(box.h / 2)})`,
      bg: "#9d7550",
    },
  ];

  return (
    <div
      className="box-scene w-full"
      role="img"
      aria-label={`Scale model of the ${box.label} box, ${box.w} by ${box.d} by ${box.h} centimetres`}
    >
      <div className="box-cube">
        {faces.map((f) => (
          <div
            key={f.key}
            className="box-face"
            style={{
              width: u(f.w),
              height: u(f.h),
              transform: f.t,
              background: f.bg,
            }}
          >
            {/* A strip of packing tape down the lid — the one detail that
                makes it read as a parcel rather than a brown rectangle. */}
            {f.key === "top" && (
              <span
                aria-hidden
                className="absolute inset-y-0 left-1/2 -translate-x-1/2"
                style={{
                  width: u(box.w * 0.12),
                  background: "rgba(146, 108, 71, 0.55)",
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
