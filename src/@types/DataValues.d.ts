type DataValues = {
	_id: string;
	updatedAt: number;
	cinemaName: string;
	circuit: string;
	city: string;
	code: string;
	weekNumber: string;
	dicos: {
		id: string;
		name;
		items: {
			id: string;
			name: string;
			type: string;
		}[];
	}[];
	posters: {
		id: string;
		name: string;
		location: string;
		format: string;
	}[];
	leds: {
		id: string;
		name: string;
		subtitle: string;
		countInHall: number;
		countInHallaway: number;
		countOutside: number;
		items: {
			id: string;
			name: string;
		}[];
	}[];
	comments: {
		display: string;
		fa: string;
	};
	fa: {
		id: string;
		name: string;
		start: string;
		end: string;
		room: number;
		type: string;
		notes: {
			id: string;
			name: string;
			type: string;
			mode?: {
				name: string;
				color: string;
				value: string;
			};
		}[];
	}[];
};
