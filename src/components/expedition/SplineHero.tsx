import Spline from "@splinetool/react-spline";

const SCENE_URL = "https://prod.spline.design/9eKHSnGMNhoFOOuC/scene.splinecode";

export function SplineHero() {
  return (
    <div className="spline-world" aria-label="Interactive 3D scene showing Earth, the Moon, Mars and exploration spacecraft">
      <Spline scene={SCENE_URL} />
    </div>
  );
}
