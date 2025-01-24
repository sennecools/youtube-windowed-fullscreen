export function add_class_to_element(
	element: HTMLElement,
	class_name: string
): void {
	if (!element.classList.contains(class_name)) {
		element.classList.add(class_name);
	}
}

export function remove_class_from_element(
	element: HTMLElement,
	class_name: string
): void {
	if (element.classList.contains(class_name)) {
		element.classList.remove(class_name);
	}
}

export function set_element_style(
	element: HTMLElement,
	styles: Record<string, string>
): void {
	for (const [key, value] of Object.entries(styles)) {
		element.style[key as any] = value;
	}
}
