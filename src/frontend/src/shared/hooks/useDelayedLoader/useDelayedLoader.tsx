import { useEffect, useRef, useState } from "react";
import { useNavigation } from "react-router";

/**
 * Used to determine if the navigation has been loading for too long to start showing a loader.
 * Once the loader is shown it will be shown for a minimum duration to avoid flashing the loader or as long as the navigation is still loading.
 * @param showDelay How much time should be spent before turning on.
 * @param minDuration The minimum duration the loader should be shown.
 * @returns true when navigation state been loading longer than showDelay param.
 */
export function useDelayedLoader(showDelay = 200, minDuration = 1000) {
	const navigation = useNavigation();
	const [showLoading, setShowLoading] = useState(false);
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const startTimeRef = useRef<number | null>(null);

	useEffect(() => {
		if (timerRef.current) clearTimeout(timerRef.current);

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

		return () => {
			if (timerRef.current) clearTimeout(timerRef.current);
		};
	}, [navigation.state, showLoading, showDelay, minDuration]);

	return showLoading;
}
