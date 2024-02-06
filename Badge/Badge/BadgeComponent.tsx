// Remove the following import statement
import * as React from 'react';
import {
    ActionButton,
    createTheme,
    FontIcon,
    IButton,
    IButtonStyles,
    IconButton,
    IIconProps,
    IPartialTheme,
    mergeStyles,
    ThemeProvider,
    TooltipHost,
} from '@fluentui/react';
import { useAsync } from '@fluentui/react-hooks';

export interface BadgeComponentProps {
    width?: number;
    height?: number;
    iconName?: string;
    text?: string;
    tooltipContent?: string;
    onSelected: () => void;
    disabled?: boolean;
    tabIndex?: number;
    ariaLabel?: string;
    themeJSON?: string;
    setFocus?: string;
    justify?: string;
    renderType?: IconRenderType;
    iconSize?: number;
    iconColor?: string;
    hoverIconColor?: string;
    fontSize?: number;
    fontColor?: string;
    hoverFontColor?: string;
    borderColor?: string;
    hoverBorderColor?: string;
    borderRadius?: number;
    fillColor?: string;
    hoverFillColor?: string;
    badgeText?: string;
    badgeSize?: number;
    badgeWeight?: string;
    badgeColor?: string;
    badgeBackgroundColor?: string;
    badgeBorderRadius?: number;
    badgePosition?: string;
    badgeOffsetX?: number;
    badgeOffsetY?: number;
    badgeBorderColor?: string;
    badgeAlightment?: string;
}

export enum IconRenderType {
    IconButon = 0,
    ActionButton = 1,
    Icon = 2,
}

export const BadgeComponent = React.memo((props: BadgeComponentProps) => {
    const { text, tooltipContent, disabled, onSelected, tabIndex, ariaLabel, setFocus, themeJSON, renderType } = props;
    const theme = React.useMemo(() => {
        try {
            return themeJSON ? createTheme(JSON.parse(themeJSON) as IPartialTheme) : undefined;
        } catch (ex) {
            /* istanbul ignore next */
            console.error('Cannot parse theme', ex);
        }
    }, [themeJSON]);

    const componentRef = React.useRef<IButton>(null);

    const async = useAsync();
    React.useEffect(() => {
        if (setFocus && setFocus !== '' && componentRef) {
            async.requestAnimationFrame(() => {
                (componentRef as React.RefObject<IButton>).current?.focus();
            });
        }
    }, [setFocus, componentRef, async]);

    const RenderButtonAs = getRenderTag(renderType);

    return (
        <ThemeProvider applyTo="none" theme={theme} className={getIconContainerStyle(props)}>
            <TooltipHost content={tooltipContent}>
                <div className="icon-with-badge">
                    {renderType === IconRenderType.Icon && (
                        <div className="icon-with-badge">
                            <FontIcon
                                aria-label={props.ariaLabel}
                                className={getIconClass(props)}
                                iconName={props.iconName}
                            />
                            <span
                                className="badge-count"
                                style={{
                                    fontSize: `${props.badgeSize}px`,
                                    fontWeight: props.badgeWeight,
                                    color: props.badgeColor,
                                    borderRadius: props.borderRadius,
                                    backgroundColor: props.badgeBackgroundColor,
                                    borderColor: props.badgeBorderColor,
                                    position: 'absolute',
                                    transform: `translate(${props.badgeOffsetX || 0}px, ${props.badgeOffsetY || 0}px)`, // Apply the offsets
                                    backgroundSize: 'contain',
                                    // Set defaults for top and right, and then override based on badgePosition
                                    /*                            top: props.badgePosition === 'BottomLeft' || props.badgePosition === 'BottomRight' ? 'auto' : '0',
                                        bottom: props.badgePosition === 'BottomLeft' || props.badgePosition === 'BottomRight' ? '0' : 'auto',
                                        left: props.badgePosition === 'TopLeft' || props.badgePosition === 'BottomLeft' ? '0' : 'auto',
                                        right: props.badgePosition === 'TopRight' || props.badgePosition === 'BottomRight' ? '0' : 'auto',
                                        */
                                }}
                            >
                                {props.badgeText}
                            </span>
                        </div>
                    )}
                    {renderType !== IconRenderType.Icon && (
                        <div className="icon-with-badge">
                            <RenderButtonAs
                                componentRef={componentRef}
                                styles={getButtonStyles(props)}
                                iconProps={getIconProps(props)}
                                ariaLabel={ariaLabel}
                                disabled={disabled}
                                text={text}
                                onClick={onSelected}
                                tabIndex={tabIndex}
                            />
                            <span
                                className="badge-count"
                                style={{
                                    fontSize: `${props.badgeSize}px`,
                                    fontWeight: props.badgeWeight,
                                    color: props.badgeColor,
                                    borderRadius: props.borderRadius,
                                    backgroundColor: props.badgeBackgroundColor,
                                    borderColor: props.badgeBorderColor,
                                    position: 'absolute',
                                    transform: `translate(${props.badgeOffsetX || 0}px, ${props.badgeOffsetY || 0}px)`, // Apply the offsets

                                    // Set defaults for top and right, and then override based on badgePosition
                                    /*                            top: props.badgePosition === 'BottomLeft' || props.badgePosition === 'BottomRight' ? 'auto' : '0',
                                        bottom: props.badgePosition === 'BottomLeft' || props.badgePosition === 'BottomRight' ? '0' : 'auto',
                                        left: props.badgePosition === 'TopLeft' || props.badgePosition === 'BottomLeft' ? '0' : 'auto',
                                        right: props.badgePosition === 'TopRight' || props.badgePosition === 'BottomRight' ? '0' : 'auto',
                                        */
                                }}
                            >
                                {props.badgeText}
                            </span>
                        </div>
                    )}
                </div>
            </TooltipHost>
        </ThemeProvider>
    );
});

BadgeComponent.displayName = 'IconComponent';

function getRenderTag(type?: IconRenderType) {
    if (type === IconRenderType.IconButon) return IconButton;
    else return ActionButton;
}

function getIconProps(props: Partial<BadgeComponentProps>) {
    return {
        iconName: props.iconName,
        styles: {
            root: {
                color: props.iconColor ?? props.fontColor,
                fontSize: props.iconSize ?? props.fontSize,
            },
        },
    } as IIconProps;
}
function getIconContainerStyle(props: Partial<BadgeComponentProps>) {
    // Vertical center font icon
    return mergeStyles({
        height: props.height,
        display: 'flex',
        alignItems: 'center',
    });
}

function getIconClass(props: BadgeComponentProps) {
    return mergeStyles({
        fontSize: props.iconSize ?? props.fontSize,
        width: props.width,
        margin: 0,
        color: props.iconColor ?? props.fontColor,
        textAlign: props.justify,
    });
}

function getButtonStyles(props: BadgeComponentProps) {
    const styles = {
        root: {
            width: props.width,
            height: props.height,
            backgroundColor: props.fillColor ?? 'transparent',
            borderColor: props.borderColor,
            color: props.fontColor,
            borderRadius: props.borderRadius,
            borderWidth: props.fillColor ? 1 : undefined,
            borderStyle: props.fillColor ? 'solid' : undefined,
            fontSize: props.fontSize,
        },
        rootHovered: {
            backgroundColor: props.hoverFillColor,
            borderColor: props.hoverBorderColor,
            color: props.hoverFontColor ?? props.fontColor,
        },
        icon: { color: props.iconColor ?? props.fontColor, fontSize: props.iconSize ?? props.fontSize },
        iconHovered: { color: props.hoverIconColor ?? props.hoverFontColor ?? props.fontColor },
        flexContainer: { justifyContent: props.justify },
    } as IButtonStyles;

    if (props.renderType === IconRenderType.Icon) {
        // Hide text part so the icon can be centered using the flexbox
        styles.textContainer = { display: 'none' };
    }
    return styles;
}
