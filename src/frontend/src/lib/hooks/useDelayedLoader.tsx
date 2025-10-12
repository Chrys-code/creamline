import { useEffect, useRef, useState } from "react";
import { useNavigation } from "react-router";

export function useDelayedLoader(showDelay = 200, minDuration = 1000) {
	const navigation = useNavigation();
	const [showLoading, setShowLoading] = useState(false);
	const timerRef = useRef(null);
	const startTimeRef = useRef(null);

	useEffect(() => {
		clearTimeout(timerRef.current);

		if (navigation.state === "loading") {
			// Start timer for showing the spinner after `showDelay`
			timerRef.current = setTimeout(() => {
				setShowLoading(true);
				startTimeRef.current = Date.now();
			}, showDelay);
		} else {
			if (showLoading) {
				// Calculate how long spinner has been visible
				const elapsed = Date.now() - (startTimeRef.current || 0);
				const remaining = minDuration - elapsed;

				// Hide spinner after remaining time if it hasn't reached minDuration
				timerRef.current = setTimeout(
					() => {
						setShowLoading(false);
						startTimeRef.current = null;
					},
					Math.max(remaining, 0)
				);
			} else {
				setShowLoading(false);
			}
		}

		return () => clearTimeout(timerRef.current);
	}, [navigation.state, showLoading, showDelay, minDuration]);

	return showLoading;
}
