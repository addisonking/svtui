/**
 * Common type utilities for svtui components
 */

/**
 * Adds a bindable ref property to component props
 */
export type WithRef<T extends HTMLElement = HTMLElement> = {
	ref?: T | null;
};

/**
 * Props for components that can render as either button or anchor
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type PolymorphicButtonProps<T = {}> = T & {
	href?: string;
};
