import { Item, Price, Size, itemPrices, itemSizes, items } from "../pizza.data";

export interface IPizzaItem {
    id: number;
    name: string;
    sizes: {
        name: string;
        price: number;
        isChecked: boolean;
    }[];
}

// Create the mapped pizza items
export function mapDataToPizzaItems(items: Item[], itemSizes: Size[], itemPrices: Price[]): IPizzaItem[] {
    return items.map(item => {
        const itemSizesWithPrices = itemSizes.map(size => {
            return {
              name: size.name,
              price:
                itemPrices.find(
                  (price) =>
                    price.itemId === item.itemId && price.sizeId === size.sizeId
                )?.price || 0,
              isChecked: true, // true by default
            };
        });

        return {
            id: item.itemId,
            name: item.name,
            sizes: itemSizesWithPrices
        };
});
}

export const PIZZA_ITEMS = mapDataToPizzaItems(items, itemSizes, itemPrices);