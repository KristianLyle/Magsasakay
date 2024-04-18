import '../css/App.css';
import FindRouteWithMap from './FindRouteWithMap';
import JeepneyRoutesWithMap from './JeepneyRoutesWithMap';

const RoutingComponent = () => {
	return (
		<div className='App'>
			<FindRouteWithMap />
			<JeepneyRoutesWithMap />
		</div>
	);
};

export default RoutingComponent;
