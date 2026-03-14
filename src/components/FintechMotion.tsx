export default function FintechMotion() {
  return (
    <>
      <style jsx>{`
        .bars {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 80%;
          height: 200px;
          display: flex;
          align-items: flex-end;
          gap: 4px;
          z-index: 0;
          pointer-events: none;
          opacity: 0.3;
        }

        .bars span {
          flex: 1;
          background: linear-gradient(to top, rgba(0, 123, 255, 0.6), rgba(0, 225, 255, 0.3));
          border-radius: 2px 2px 0 0;
        }

        .bars span:nth-child(1) { height: 60%; }
        .bars span:nth-child(2) { height: 80%; }
        .bars span:nth-child(3) { height: 45%; }
        .bars span:nth-child(4) { height: 90%; }
        .bars span:nth-child(5) { height: 70%; }
        .bars span:nth-child(6) { height: 55%; }
        .bars span:nth-child(7) { height: 85%; }
        .bars span:nth-child(8) { height: 40%; }
        .bars span:nth-child(9) { height: 75%; }
        .bars span:nth-child(10) { height: 65%; }
        .bars span:nth-child(11) { height: 50%; }
        .bars span:nth-child(12) { height: 88%; }
        .bars span:nth-child(13) { height: 35%; }
        .bars span:nth-child(14) { height: 72%; }
        .bars span:nth-child(15) { height: 58%; }
      `}</style>

      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
        <div className="bars">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </>
  );
}
