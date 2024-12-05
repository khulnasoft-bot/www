import type {PopoverProps} from "@nextui-org/popover";
import type {MenuTriggerType} from "@react-types/menu";
import type {Ref} from "react";
import type {HTMLNextUIProps, PropGetter} from "@nextui-org/system";

import {useProviderContext} from "@nextui-org/system";
import {useMenuTriggerState} from "@react-stately/menu";
import {useMenuTrigger} from "@react-aria/menu";
import {dropdown} from "@nextui-org/theme";
import {clsx} from "@nextui-org/shared-utils";
import {ReactRef, mergeRefs} from "@nextui-org/react-utils";
import {ariaShouldCloseOnInteractOutside} from "@nextui-org/aria-utils";
import {useMemo, useRef} from "react";
import {mergeProps} from "@react-aria/utils";
import {MenuProps} from "@nextui-org/menu";
import {CollectionElement} from "@react-types/shared";

interface Props extends HTMLNextUIProps<"div"> {
  /**
   * Type of overlay that is opened by the trigger.
   */
  type?: "menu" | "listbox";
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
  /**
   * How the menu is triggered.
   * @default 'press'
   */
  trigger?: MenuTriggerType;
  /**
   * Whether menu trigger is disabled.
   * @default false
   */
  isDisabled?: boolean;
  /**
   * Whether the Menu closes when a selection is made.
   * @default true
   */
  closeOnSelect?: boolean;
}

export type UseDropdownProps = Props & Omit<PopoverProps, "children" | "color" | "variant">;

const getMenuItem = <T extends object>(props: Partial<MenuProps<T>> | undefined, key: string) => {
  if (props) {
    const mergedChildren = Array.isArray(props.children)
      ? props.children
      : [...(props?.items || [])];

    if (mergedChildren && mergedChildren.length) {
      const item = ((mergedChildren as CollectionElement<T>[]).find((item) => {
        if (item.key === key) {
          return item;
        }
      }) || {}) as {props: MenuProps};

      return item;
    }
  }

  return null;
};

const getCloseOnSelect = <T extends object>(
  props: Partial<MenuProps<T>> | undefined,
  key: string,
  item?: any,
) => {
  const mergedItem = item || getMenuItem(props, key);

  if (mergedItem && mergedItem.props && "closeOnSelect" in mergedItem.props) {
    return mergedItem.props.closeOnSelect;
  }

  return props?.closeOnSelect;
};

export function useDropdown(props: UseDropdownProps): UseDropdownReturn {
  const globalContext = useProviderContext();

  const {
    as,
    triggerRef: triggerRefProp,
    isOpen,
    defaultOpen,
    onOpenChange,
    isDisabled,
    type = "menu",
    trigger = "press",
    placement = "bottom",
    closeOnSelect = true,
    shouldBlockScroll = true,
    classNames: classNamesProp,
    disableAnimation = globalContext?.disableAnimation ?? false,
    onClose,
    className,
    ...otherProps
  } = props;

  const Component = as || "div";

  const triggerRef = useRef<HTMLElement>(null);
  const menuTriggerRef = triggerRefProp || triggerRef;
  const menuRef = useRef<HTMLUListElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const state = useMenuTriggerState({
    trigger,
    isOpen,
    defaultOpen,
    onOpenChange: (isOpen) => {
      onOpenChange?.(isOpen);
      if (!isOpen) {
        onClose?.();
      }
    },
  });

  const {menuTriggerProps, menuProps} = useMenuTrigger<object>(
    {type, trigger, isDisabled},
    state,
    menuTriggerRef,
  );

  const classNames = useMemo(
    () =>
      dropdown({
        className,
      }),
    [className],
  );

  const onMenuAction = (menuCloseOnSelect?: boolean) => {
    if (menuCloseOnSelect !== undefined && !menuCloseOnSelect) {
      return;
    }
    if (closeOnSelect) {
      state.close();
    }
  };

  const getPopoverProps: PropGetter = (props = {}) => {
    const popoverProps = mergeProps(otherProps, props);

    return {
      state,
      placement,
      ref: popoverRef,
      disableAnimation,
      shouldBlockScroll,
      scrollRef: menuRef,
      triggerRef: menuTriggerRef,
      ...popoverProps,
      classNames: {
        ...classNamesProp,
        ...props.classNames,
        content: clsx(classNames, classNamesProp?.content, props.className),
      },
      shouldCloseOnInteractOutside: popoverProps?.shouldCloseOnInteractOutside
        ? popoverProps.shouldCloseOnInteractOutside
        : (element: Element) => ariaShouldCloseOnInteractOutside(element, triggerRef, state),
    };
  };

  const getMenuTriggerProps: PropGetter = (
    originalProps = {},
    _ref: Ref<any> | null | undefined = null,
  ) => {
    // These props are not needed for the menu trigger since it is handled by the popover trigger.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {onPress, onPressStart, ...otherMenuTriggerProps} = menuTriggerProps;

    return {
      ...mergeProps(otherMenuTriggerProps, {isDisabled}, originalProps),
      ref: mergeRefs(_ref, triggerRef),
    };
  };

  const getMenuProps = <T extends object>(
    props?: Partial<MenuProps<T>>,
    _ref: Ref<any> | null | undefined = null,
  ) => {
    return {
      ref: mergeRefs(_ref, menuRef),
      menuProps,
      closeOnSelect,
      ...mergeProps(props, {
        onAction: (key: any, item?: any) => {
          const closeOnSelect = getCloseOnSelect(props, key, item);

          onMenuAction(closeOnSelect);
        },
        onClose: state.close,
      }),
    } as MenuProps;
  };

  return {
    Component,
    menuRef,
    menuProps,
    classNames,
    closeOnSelect,
    onClose: state.close,
    autoFocus: state.focusStrategy || true,
    disableAnimation,
    getPopoverProps,
    getMenuProps,
    getMenuTriggerProps,
  };
}

// export type UseDropdownReturn = ReturnType<typeof useDropdown>;

export type UseDropdownReturn = {
  Component: string | React.ElementType;
  menuRef: React.RefObject<HTMLUListElement>;
  menuProps: any;
  classNames: string;
  closeOnSelect: boolean;
  onClose: () => void;
  autoFocus: any;
  disableAnimation: boolean;
  getPopoverProps: PropGetter;
  getMenuProps: <T extends object>(props?: Partial<MenuProps<T>>, ref?: Ref<any>) => MenuProps;
  getMenuTriggerProps: (props?: any, ref?: Ref<any>) => any;
};