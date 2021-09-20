interface RenderState {
	burger: boolean;
}
interface RenderAction {
	type: string;
	payload: {
		burger: boolean;
	};
}

const initialRenderState = {
	burger: false,
};

const renderReducer = (
	state: RenderState = initialRenderState,
	action: RenderAction
) => {
	switch (action.type) {
		case 'TOGGLE_BURGER':
			return { burger: !state.burger };
		default:
			return state;
	}
};

export default renderReducer;
