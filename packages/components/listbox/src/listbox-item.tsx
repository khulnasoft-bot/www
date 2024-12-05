import {useMemo, ReactNode} from "react";

import {UseListboxItemProps, useListboxItem} from "./use-listbox-item";
import {ListboxSelectedIcon} from "./listbox-selected-icon";

export interface ListboxItemProps<T extends object = object>
  extends Omit<UseListboxItemProps<T>, "hasDescriptionTextChild" | "hasTitleTextChild"> {}

/**
 * @internal
 */
const ListboxItem = (props: ListboxItemProps) => {
  const {
    Component,
    FragmentWrapper,
    rendered,
    description,
    isSelectable,
    isSelected,
    isDisabled,
    selectedIcon,
    startContent,
    endContent,
    hideSelectedIcon,
    disableAnimation,
    fragmentWrapperProps,
    getItemProps,
    getLabelProps,
    getWrapperProps,
    getDescriptionProps,
    getSelectedIconProps,
  } = useListboxItem(props);

  const selectedContent = useMemo<ReactNode | null>(() => {
    const defaultIcon = (
      <ListboxSelectedIcon disableAnimation={disableAnimation} isSelected={isSelected} />
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
          <div {...getWrapperProps()}>
            <span {...getLabelProps()}>{rendered}</span>
            <span {...getDescriptionProps()}>{description}</span>
          </div>
        ) : (
          <span {...getLabelProps()}>{rendered}</span>
        )}
        {isSelectable && !hideSelectedIcon && (
          <span {...getSelectedIconProps()}>{selectedContent}</span>
        )}
        {endContent}
      </FragmentWrapper>
    </Component>
  );
};

ListboxItem.displayName = "NextUI.ListboxItem";

export default ListboxItem;
