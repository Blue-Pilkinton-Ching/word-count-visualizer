import { logEvent } from 'firebase/analytics';
import { analytics } from '../../routes/firebase';

type EventName = string;

const wordCountEvent: EventName = 'word_count_event';

export function logWordCountEvent(value: number) {
	if (!analytics) return;
	logEvent(analytics, wordCountEvent, {
		value
	});
}
