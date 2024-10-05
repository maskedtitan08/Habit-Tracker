import { useGlobalContextProvider } from "@/contextAPI";
import { menuItemType } from "@/Types/MenuItemType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const MenuSelection = () => {
    const { menuItemsObject } = useGlobalContextProvider();
    const { menuItems } = menuItemsObject;

    return (
        <div className="mt-[180px]">
            {menuItems && menuItems.map((menuItem: menuItemType, menuItemIndex: number) => (
                <div key={menuItemIndex}>
                    <SingleMenuItem menuItemProp={menuItem} />
                </div>
            ))}
        </div>
    )
}

const SingleMenuItem = ({ menuItemProp }: { menuItemProp: menuItemType }) => {
    const { menuItemsObject } = useGlobalContextProvider();
    const { menuItems, setMenuItems } = menuItemsObject;
    const handleClickedItem = () => {
        const copyMenuItems = menuItems.map((menuItem) => {
            if (menuItemProp.name === menuItem.name) {
                return { ...menuItem, isSelected: true };
            }
            else return { ...menuItem, isSelected: false };
        })

        setMenuItems(copyMenuItems);
    }
    return (
        <div
            onClick={handleClickedItem}
            className={`flex gap-2 items-center p-2 mb-3 ml-8 cursor-pointer rounded-md w-36
            ${menuItemProp.isSelected ? "bg-customRed transition-all text-white" : "hover:text-customRed"}`}>
            <FontAwesomeIcon className=" " icon={menuItemProp.icon} width={20} height={20} />
            <div>{menuItemProp.name}</div>
        </div>
    )
}

export default MenuSelection