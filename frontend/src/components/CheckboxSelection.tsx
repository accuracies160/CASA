import { useState } from "react";

export function CheckboxSelection<T extends number | string>() {
    const [selected, setSelected] = useState<Set<T>>(new Set());

    const toggleOne = (id: T) => {
        setSelected(prev => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    };

    const toggleMany = (ids: T[]) => {
        setSelected(prev =>
            prev.size === ids.length ? new Set() : new Set(ids)
        );
    };

    const clear = () => setSelected(new Set());

    return {
        selected,
        toggleOne,
        toggleMany,
        clear,
        count: selected.size,
    };
}