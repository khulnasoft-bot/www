import {useMemo, ReactNode} from "react";

import {UseMenuItemProps, useMenuItem} from "./use-menu-item";
import {MenuSelectedIcon} from "./menu-selected-icon";

export interface MenuItemProps<T extends object = object>
  extends Omit<UseMenuItemProps<T>, "hasDescriptionTextChild" | "hasTitleTextChild"> {}

/**
 * @internal
 */
const MenuItem = (props: MenuItemProps) => {
  const {
    Component,
    FragmentWrapper,
    slots,
    classNames,
    rendered,
    shortcut,
    description,
    isSelectable,
    isSelected,
    isDisabled,
    selectedIcon,
    startContent,
    endContent,
    disableAnimation,
    hideSelectedIcon,
    fragmentWrapperProps,
    getItemProps,
    getLabelProps,
    getDescriptionProps,
    getKeyboardShortcutProps,
    getSelectedIconProps,
  } = useMenuItem(props);

  const selectedContent = useMemo<ReactNode | null>(() => {
    const defaultIcon = (
      <MenuSelectedIcon disableAnimation={disableAnimation} isSelected={isSelected} />
    );

    if (typeof selectedIcon === "function") {
      return selectedIcon({icon: defaultIcon, isSelected, isDisabled});
    }

    if (selectedIcon) return selectedIcon;

    return defaultIcon;
  }, [selectedIcon, isSelected, isDisabled, disableAnimation]);

  return (
    <Component {...getItemProps()}>
      <FragmentWrapper {...fragmentWrapperProps}>
        {startContent}
        {description ? (
          <div className={slots.wrapper({class: classNames?.wrapper})}>
            <span {...getLabelProps()}>{rendered}</span>
            <span {...getDescriptionProps()}>{description}</span>
          </div>
        ) : (
          <span {...getLabelProps()}>{rendered}</span>
        )}
        {shortcut && <kbd {...getKeyboardShortcutProps()}>{shortcut}</kbd>}
        {isSelectable && !hideSelectedIcon && (
          <span {...getSelectedIconProps()}>{selectedContent}</span>
        )}
        {endContent}
      </FragmentWrapper>
    </Component>
  );
};

MenuItem.displayName = "NextUI.MenuItem";

export default MenuItem;
