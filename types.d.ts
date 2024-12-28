import { ThreeElements } from "@react-three/fiber";

declare global {
	namespace React {
		namespace JSX {
			interface IntrinsicElements extends ThreeElements {}
		}
	}
}

// TODO: Remove this once react 19 matures and react three fiber works better on it.
