"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import type { Transition } from 'framer-motion';


// --- MacBook Frame Dimensions ---
const LID_W = 1440;
const LID_H = 900;
const FOOT_H = 42;
const TOTAL_H = LID_H + FOOT_H;

interface MacBookFrameProps {
  width: number;
  frameColor: 'Silver' | 'Space Black';
  showShadow: boolean;
  glareX: any;
  glareY: any;
  children: React.ReactNode;
}

function MacBookFrame({
  width,
  frameColor,
  showShadow,
  glareX,
  glareY,
  children
}: MacBookFrameProps) {
  const s = width / LID_W;
  const lidH = LID_H * s;
  const ftH = FOOT_H * s;
  const totH = lidH + ftH;
  const silver = frameColor !== 'Space Black';
  const rimW = 4 * s;
  const bezT = 32 * s;
  const bezS = 18 * s;
  const bezB = 10 * s;
  const notchW = 112 * s;
  const notchH = 22 * s;
  const camD = 8 * s;
  const Ro = 18 * s;
  const Ri = 14 * s;
  const Rs = 5 * s;

  const rimGrad = silver
    ? 'linear-gradient(158deg, #e2e2e2 0%, #c8c8c8 50%, #b4b4b4 100%)'
    : 'linear-gradient(158deg, #3c3c3c 0%, #282828 50%, #1c1c1c 100%)';

  const shadowStr = !showShadow
    ? 'none'
    : silver
      ? [
        '0 0 0 1px rgba(0,0,0,0.13)',
        '0 30px 80px rgba(0,0,0,0.20)',
        '0 6px 16px rgba(0,0,0,0.12)',
        'inset 0 1px 0 rgba(255,255,255,0.90)'
      ].join(', ')
      : [
        '0 0 0 1px rgba(255,255,255,0.07)',
        '0 30px 80px rgba(0,0,0,0.70)',
        '0 6px 16px rgba(0,0,0,0.45)',
        'inset 0 1px 0 rgba(255,255,255,0.05)'
      ].join(', ');

  const panelBg = '#080808';
  const glareBackground = useTransform(
    [glareX, glareY],
    ([x, y]) => `radial-gradient(ellipse at ${x}% ${y}%, rgba(255,255,255,0.09) 0%, transparent 60%)`
  );

  return (
    <div style={{ width, height: totH, position: 'relative', flexShrink: 0 }}>
      {/* Laptop Screen Lid */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width,
          height: lidH,
          background: rimGrad,
          borderRadius: `${Ro}px ${Ro}px 0 0`,
          boxShadow: shadowStr,
          zIndex: 2
        }}
      >
        {/* Screen Outer Bezel */}
        <div
          style={{
            position: 'absolute',
            top: rimW,
            left: rimW,
            right: rimW,
            bottom: 0,
            background: panelBg,
            borderRadius: `${Ri}px ${Ri}px 0 0`,
            overflow: 'hidden'
          }}
        >
          {/* Webcam */}
          <div
            style={{
              position: 'absolute',
              top: (bezT - camD) / 2,
              left: '50%',
              transform: 'translateX(-50%)',
              width: camD,
              height: camD,
              borderRadius: '50%',
              background: '#1a1a1a',
              boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.95), 0 0 0 1.5px rgba(255,255,255,0.07)',
              zIndex: 11
            }}
          />
          {/* Screen Inner Display Area */}
          <div
            style={{
              position: 'absolute',
              top: bezT,
              left: bezS,
              right: bezS,
              bottom: bezB,
              background: '#000',
              borderRadius: Rs,
              overflow: 'hidden'
            }}
          >
            <div style={{ position: 'absolute', inset: 0 }}>{children}</div>
            {/* Reflective Glare */}
            <motion.div
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: 9,
                pointerEvents: 'none',
                borderRadius: Rs,
                background: glareBackground
              }}
            />
            {/* Screen Notch */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: notchW,
                height: notchH,
                background: panelBg,
                borderRadius: `0 0 ${8 * s}px ${8 * s}px`,
                zIndex: 10
              }}
            />
          </div>
        </div>
      </div>

      {/* Laptop Base / Keyboard Hinge */}
      <div
        style={{
          position: 'absolute',
          top: lidH,
          left: 0,
          width,
          height: ftH,
          background: silver
            ? 'linear-gradient(180deg, #d2d2d2 0%, #c4c4c4 50%, #b8b8b8 100%)'
            : 'linear-gradient(180deg, #2c2c2c 0%, #202020 50%, #181818 100%)',
          borderRadius: `0 0 ${10 * s}px ${10 * s}px`,
          zIndex: 1,
          overflow: 'hidden',
          boxShadow: showShadow
            ? `0 10px 36px rgba(0,0,0,${silver ? 0.18 : 0.58}), inset 0 1px 0 rgba(255,255,255,${silver ? 0.3 : 0.06
            })`
            : 'none'
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 1.5 * s,
            background: silver ? 'rgba(0,0,0,0.18)' : 'rgba(0,0,0,0.55)'
          }}
        />
        {/* Notch cutout for opening lid */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 108 * s,
            height: Math.max(4, 16 * s),
            background: silver ? 'rgba(0,0,0,0.08)' : 'rgba(0,0,0,0.35)',
            borderRadius: 999,
            boxShadow: `inset 0 1px 3px rgba(0,0,0,${silver ? 0.1 : 0.3})`
          }}
        />
        {/* Feet pads */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 18 * s,
            width: 22 * s,
            height: 7 * s,
            borderRadius: `0 0 ${4 * s}px ${4 * s}px`,
            background: silver ? 'rgba(0,0,0,0.26)' : 'rgba(0,0,0,0.60)',
            boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.25)'
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            right: 18 * s,
            width: 22 * s,
            height: 7 * s,
            borderRadius: `0 0 ${4 * s}px ${4 * s}px`,
            background: silver ? 'rgba(0,0,0,0.26)' : 'rgba(0,0,0,0.60)',
            boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.25)'
          }}
        />
      </div>
    </div>
  );
}

// --- Transition Variants ---
function getVariants(effect: string, direction: number) {
  if (effect === 'Fade') {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.4, ease: 'easeInOut' } as Transition,
      style: {}
    };
  }
  return {
    initial: { x: direction > 0 ? '100%' : '-100%', opacity: 0.6 },
    animate: { x: 0, opacity: 1 },
    exit: { x: direction > 0 ? '-100%' : '100%', opacity: 0.6 },
    transition: { duration: 0.32, ease: [0.32, 0, 0.67, 0] } as Transition,
    style: {}
  };
}

interface MediaItem {
  type: 'video' | 'image';
  src: string;
}

interface VideoPlayerProps {
  mediaItems: MediaItem[];
  autoplay: boolean;
  loop: boolean;
  progressBar: boolean;
  videoTransition: string;
  imageDuration: number;
  activeIndex?: number;
  onIndexChange?: (idx: number) => void;
}

function VideoPlayer({
  mediaItems,
  autoplay,
  loop,
  progressBar,
  videoTransition,
  imageDuration,
  activeIndex = 0,
  onIndexChange
}: VideoPlayerProps) {
  const [index, setIndex] = useState(activeIndex);
  const [playing, setPlaying] = useState(autoplay);
  const [direction, setDirection] = useState(1);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const startX = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  // Sync state index when external activeIndex prop changes
  useEffect(() => {
    if (activeIndex !== index) {
      setDirection(activeIndex > index ? 1 : -1);
      setIndex(activeIndex);
    }
  }, [activeIndex]);

  const current = mediaItems[index];
  const isImage = current?.type === 'image';

  useEffect(() => {
    setProgress(0);
  }, [index]);

  useEffect(() => {
    if (!current || isImage || !videoRef.current) return;
    if (playing) {
      videoRef.current.play().catch(() => { });
    } else {
      videoRef.current.pause();
    }
  }, [playing, index, isImage, current]);

  useEffect(() => {
    if (!current || !isImage) return;
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
    }
    const duration = imageDuration * 1000;
    const start = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - start) / duration, 1);
      setProgress(p);
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        goTo(index + 1);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [index, isImage, imageDuration, current]);

  const goTo = (next: number) => {
    const wrapped = (next + mediaItems.length) % mediaItems.length;
    setDirection(next > index ? 1 : -1);
    setIndex(wrapped);
    setPlaying(autoplay);
    if (onIndexChange) {
      onIndexChange(wrapped);
    }
  };

  if (!current || !current.src) {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#111',
          flexDirection: 'column',
          gap: 8
        }}
      >
        <div style={{ fontSize: 28 }}>💻</div>
        <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, fontFamily: 'inherit' }}>
          No Media Added
        </span>
      </div>
    );
  }

  const v = getVariants(videoTransition, direction);

  return (
    <div
      style={{ width: '100%', height: '100%', background: '#000', overflow: 'hidden', cursor: 'pointer', position: 'relative' }}
      onTouchStart={(e) => {
        startX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (startX.current === null) return;
        const delta = startX.current - e.changedTouches[0].clientX;
        if (delta > 50) goTo(index + 1);
        else if (delta < -50) goTo(index - 1);
        startX.current = null;
      }}
      onMouseDown={(e) => {
        startX.current = e.clientX;
      }}
      onMouseUp={(e) => {
        if (startX.current === null) return;
        const delta = startX.current - e.clientX;
        if (Math.abs(delta) < 8) {
          const rect = e.currentTarget.getBoundingClientRect();
          const isRight = e.clientX - rect.left > rect.width / 2;
          if (mediaItems.length > 1) {
            isRight ? goTo(index + 1) : goTo(index - 1);
          } else {
            setPlaying((p) => !p);
          }
        } else if (delta > 50) {
          goTo(index + 1);
        } else if (delta < -50) {
          goTo(index - 1);
        }
        startX.current = null;
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={index}
          initial={v.initial}
          animate={v.animate}
          exit={v.exit}
          transition={v.transition}
          style={{ position: 'absolute', inset: 0, ...v.style }}
        >
          {isImage ? (
            <img src={current.src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <video
              ref={videoRef}
              src={current.src}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              loop={loop}
              muted
              playsInline
              autoPlay={autoplay}
              onTimeUpdate={(e) => {
                const el = e.currentTarget;
                if (el.duration) {
                  setProgress(el.currentTime / el.duration);
                }
              }}
              onEnded={() => {
                if (!loop) goTo(index + 1);
              }}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {progressBar && (
        <div
          style={{
            position: 'absolute',
            bottom: 28,
            left: '6%',
            right: '6%',
            height: 2,
            background: 'rgba(255,255,255,0.2)',
            borderRadius: 1,
            zIndex: 8,
            pointerEvents: 'none'
          }}
        >
          <div
            style={{
              height: '100%',
              borderRadius: 1,
              width: `${progress * 100}%`,
              background: '#fff',
              transition: 'width 0.25s linear'
            }}
          />
        </div>
      )}

      {!playing && (
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            zIndex: 5
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              background: 'rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <div
              style={{
                width: 0,
                height: 0,
                borderTop: '10px solid transparent',
                borderBottom: '10px solid transparent',
                borderLeft: '16px solid white',
                marginLeft: 3
              }}
            />
          </div>
        </motion.div>
      )}

      {mediaItems.length > 1 && (
        <div
          style={{
            position: 'absolute',
            bottom: 10,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 6,
            zIndex: 6
          }}
        >
          {mediaItems.map((_, i) => (
            <div
              key={i}
              style={{
                height: 4,
                width: i === index ? 20 : 4,
                borderRadius: 3,
                background: i === index ? '#fff' : 'rgba(255,255,255,0.4)',
                transition: 'all 0.25s'
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface ScreenCarouselProps {
  style?: React.CSSProperties;
  video1?: string;
  video2?: string;
  video3?: string;
  image1?: string;
  image2?: string;
  image3?: string;
  mediaOrder?: string[];
  imageDuration?: number;
  autoplay?: boolean;
  loop?: boolean;
  laptopWidth?: number;
  frameColor?: 'Silver' | 'Space Black';
  frameShadow?: boolean;
  tilt?: boolean;
  tiltStrength?: number;
  ambientGlow?: boolean;
  glowColor?: string;
  glowIntensity?: number;
  progressBar?: boolean;
  videoTransition?: 'Slide' | 'Fade';
  background?: string;
  activeIndex?: number;
  onIndexChange?: (idx: number) => void;
  customMediaItems?: MediaItem[];
}

export default function ScreenCarousel({
  style,
  video1,
  video2,
  video3,
  image1,
  image2,
  image3,
  mediaOrder = ['I1', 'I2', 'I3'],
  imageDuration = 3,
  autoplay = true,
  loop = true,
  laptopWidth = 720,
  frameColor = 'Silver',
  frameShadow = true,
  tilt = true,
  tiltStrength = 12,
  ambientGlow = true,
  glowColor = '#BEEB42',
  glowIntensity = 40,
  progressBar = true,
  videoTransition = 'Slide',
  background = 'rgba(0,0,0,0)',
  activeIndex = 0,
  onIndexChange,
  customMediaItems
}: ScreenCarouselProps) {
  const srcMap: Record<string, MediaItem> = {
    V1: { type: 'video', src: video1 ?? '' },
    V2: { type: 'video', src: video2 ?? '' },
    V3: { type: 'video', src: video3 ?? '' },
    I1: { type: 'image', src: image1 ?? '' },
    I2: { type: 'image', src: image2 ?? '' },
    I3: { type: 'image', src: image3 ?? '' }
  };

  const mediaItems = customMediaItems && customMediaItems.length > 0
    ? customMediaItems
    : mediaOrder
      .map((k) => srcMap[k])
      .filter((m) => Boolean(m?.src));

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerW, setContainerW] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;
    const obs = new ResizeObserver(([entry]) => {
      setContainerW(entry.contentRect.width);
    });
    obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  const eLaptopWidth = containerW > 0 ? Math.min(laptopWidth, containerW - 32) : laptopWidth;

  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const springRotX = useSpring(rotX, { stiffness: 160, damping: 22 });
  const springRotY = useSpring(rotY, { stiffness: 160, damping: 22 });
  const glareX = useTransform(springRotY, [-tiltStrength, tiltStrength], [20, 80]);
  const glareY = useTransform(springRotX, [-tiltStrength, tiltStrength], [80, 20]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background,
        boxSizing: 'border-box',
        ...style
      }}
    >
      <div
        onMouseMove={(e) => {
          if (!tilt || !containerRef.current) return;
          const rect = containerRef.current.getBoundingClientRect();
          const dx = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
          const dy = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
          rotY.set(dx * tiltStrength);
          rotX.set(-dy * tiltStrength);
        }}
        onMouseLeave={() => {
          rotX.set(0);
          rotY.set(0);
        }}
        style={{
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          perspective: '1200px',
          padding: '24px 0'
        }}
      >
        {ambientGlow && (
          <div
            style={{
              position: 'absolute',
              width: eLaptopWidth * 1.2,
              height: eLaptopWidth * 0.5,
              background: glowColor,
              borderRadius: '50%',
              filter: `blur(${eLaptopWidth * 0.2}px)`,
              opacity: glowIntensity / 100,
              pointerEvents: 'none',
              zIndex: 0
            }}
          />
        )}
        <motion.div
          style={{
            rotateX: tilt ? springRotX : 0,
            rotateY: tilt ? springRotY : 0,
            transformStyle: 'preserve-3d',
            zIndex: 1
          }}
        >
          <MacBookFrame
            width={eLaptopWidth}
            frameColor={frameColor}
            showShadow={frameShadow}
            glareX={glareX}
            glareY={glareY}
          >
            <VideoPlayer
              mediaItems={mediaItems}
              autoplay={autoplay}
              loop={loop}
              progressBar={progressBar}
              videoTransition={videoTransition}
              imageDuration={imageDuration}
              activeIndex={activeIndex}
              onIndexChange={onIndexChange}
            />
          </MacBookFrame>
        </motion.div>
      </div>
    </div>
  );
}
