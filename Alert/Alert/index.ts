import {IInputs, IOutputs} from "./generated/ManifestTypes";
import AlertControl from "./AlertComponent";
import * as React from 'react';
import * as ReactDOM from 'react-dom';


export class Alert implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	private _container:HTMLDivElement;

	constructor()
	{

	}

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement)
	{
        this._container = container;
        this.renderControl(context);
	}

	private renderControl(context: ComponentFramework.Context<IInputs>){
        
		let props = {
            messageType: context.parameters.messageType.raw,
            messageTitle: context.parameters.messageTitle.raw,
			messageText : context.parameters.message.raw,
			showLink : context.parameters.showLink.raw === "Yes",
			link:context.parameters.link?.raw || undefined,
			linkText:context.parameters.linkText?.raw,
            timeout:context.parameters.timeout ? Number(context.parameters.timeout) : undefined,
            open : context.parameters.open.raw,
            vertical: context.parameters.verticalPosition.raw,
            horizontal: context.parameters.horizontalPosition.raw,
            themeJSON: undefinedIfEmpty(context.parameters.Theme),
		};
	    ReactDOM.render(React.createElement(AlertControl, props), this._container);
	}

	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		this.renderControl(context);
	}

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		return {};
	}

	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void
	{
		ReactDOM.unmountComponentAtNode(this._container);
	}
}
function undefinedIfEmpty(property: ComponentFramework.PropertyTypes.Property) {
    return defaultIfEmpty(property, undefined);
}

function defaultIfEmpty<T>(property: ComponentFramework.PropertyTypes.Property, defaultValue: T) {
    return (property.raw as T) ? property.raw : defaultValue;
}

function undefinedIfZero(property: ComponentFramework.PropertyTypes.Property) {
    return property.raw && property.raw > 0 ? property.raw : undefined;
}
function valueOrUndefined(property: ComponentFramework.PropertyTypes.Property) {
    // Check for null or undefined, but allow 0 and negative values
    return property.raw !== null && property.raw !== undefined ? property.raw : undefined;
}
