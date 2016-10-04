// JavaScript Document
// for state machine pattern

function consoleEcho(e) {
	console.log(e);
	return this.currentState;
}

// SIGNAL TABLE
function EventHandler(options) {
	this.E_add_new_box = options.E_add_new_box || consoleEcho;
	this.E_add_new_polygon = options.E_add_new_polygon || consoleEcho;
	this.E_action_done = options.E_action_done || consoleEcho;
	this.E_zoom_in = options.E_zoom_in || consoleEcho;
	this.E_zoom_out = options.E_zoom_out || consoleEcho;
	this.E_save = options.E_save || consoleEcho;
	this.E_delete_proxy = options.E_delete_proxy || consoleEcho;
	this.E_add_space_corner = options.E_delete_proxy || consoleEcho;
	this.E_toggle_show_cur_shape = options.E_delete_proxy || consoleEcho;
	this.E_toggle_show_other_proxy = options.E_delete_proxy || consoleEcho;

}

//var nextState = this.actionTransitionFunctions[this.currentState][event.type](event);
function StateMachine(options) {
	if (options === undefined)
		options = {};

	// STATE TABLE
	this.actionTransitionFunctions = {
		Initial : options.Initial || new EventHandler({}),
		AddBottomFace : options.AddBottomFace || new EventHandler({}),
		AddTopFace : options.AddTopFace || new EventHandler({}),
		AddPolygon : options.AddPolygon || new EventHandler({}), 		//add 3ptrs
		AdjustPolygon : options.AdjustPolygon || new EventHandler({}),
		AddTag : options.AddTag || new EventHandler({}),
		DeleteProxy : options.DeleteProxy || new EventHandler({}),
		Idle : options.Idle || new EventHandler({}),
		AdjustSpaceCorner : options.AdjustSpaceCorner || new EventHandler({}),
		Send : options.Send || new EventHandler({}) ,
		Reload : options.Reload || new EventHandler({})
	};

	this.resetALL = function() {
		consoleEcho('reset ALL')
	};

	this.currentState = 'Initial';

	this.doActionTransition = function(anotherState, anotherEventType, event) {
		return this.actionTransitionFunctions[anotherState][anotherEventType]
				.call(this, event);
	}
	this.unexpectedEvent = function(event) {
		alert("handled unexpected event " + event.type + " in state "
				+ this.currentState);
		return this.Initial;
	};

			this.undefinedState = function(event, state) {
				alert("transitioned to undefined state " + state
						+ " from state " + this.currentState + " due to event "
						+ event.type);
				return this.initialState;
			},

	this.handleEvent = function(event) {

		//get current event handle 
		var actionTransitionFunction = this.actionTransitionFunctions[this.currentState][event.type];

		//if not exist , use unexpectedevent handler
		if (!actionTransitionFunction)
			actionTransitionFunction = this.unexpectedEvent;

		var nextState = actionTransitionFunction.call(this, event);

		//if next state is not exist not transmit
		if (!nextState)
			nextState = this.currentState;

		//log
		console.log(event.type + " event caused transition from "
				+ this.currentState + " state to " + nextState
				+ " state");

		//if next state is invalid use undefined Handler
		if (!this.actionTransitionFunctions[nextState])
			nextState = this.undefinedState(event, nextState);

		this.currentState = nextState;
	};

}
