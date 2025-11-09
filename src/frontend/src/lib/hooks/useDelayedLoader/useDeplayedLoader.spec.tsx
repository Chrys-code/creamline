import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useDelayedLoader } from "./useDelayedLoader";

// Mock `useNavigation`
vi.mock("react-router", () => ({
	useNavigation: vi.fn(),
}));

import { useNavigation } from "react-router";

describe("useDelayedLoader", () => {
	beforeEach(() => {
		vi.useFakeTimers();
		(useNavigation as vi.Mock).mockReturnValue({ state: "idle" });
	});

	afterEach(() => {
		vi.clearAllTimers();
		vi.useRealTimers();
	});

	it("should not show loader immediately", () => {
		const { result } = renderHook(() => useDelayedLoader());
		expect(result.current).toBe(false);
	});

	it("should show loader after showDelay when navigation is loading", () => {
		(useNavigation as vi.Mock).mockReturnValue({ state: "loading" });
		const { result, rerender } = renderHook(() => useDelayedLoader(200, 1000));

		// Trigger useEffect with "loading" state
		rerender();

		// Not yet shown before delay
		expect(result.current).toBe(false);

		// Fast-forward past the showDelay
		act(() => {
			vi.advanceTimersByTime(200);
		});

		expect(result.current).toBe(true);
	});

	it("should stay visible for at least minDuration after loading ends", () => {
		const { result, rerender } = renderHook(() => useDelayedLoader(200, 1000));

		// Step 1: navigation goes to "loading"
		(useNavigation as vi.Mock).mockReturnValue({ state: "loading" });
		rerender();
		act(() => {
			vi.advanceTimersByTime(200); // spinner shows
		});
		expect(result.current).toBe(true);

		// Step 2: navigation ends quickly
		(useNavigation as vi.Mock).mockReturnValue({ state: "idle" });
		rerender();

		// Step 3: not hidden before minDuration
		act(() => {
			vi.advanceTimersByTime(500);
		});
		expect(result.current).toBe(true);

		// Step 4: hidden after minDuration
		act(() => {
			vi.advanceTimersByTime(500);
		});
		expect(result.current).toBe(false);
	});
});
