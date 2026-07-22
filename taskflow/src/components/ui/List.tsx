interface ListProps<T> {
    items: T[];
    renderItem: (item: T, index: number) => React.ReactNode;
    emptyMessage: "No tasks found.";
}

export default function List<T>({ items, renderItem, emptyMessage }: ListProps<T>) {
    if (items.length===0){
        return <p>{emptyMessage}</p>;
    }

    return (
        <>
            {items.map((item, i) => renderItem(item, i))}
        </>
    )
}