import { Subject } from 'rxjs';

export interface Animation {
  start(): Subject<boolean>;
}
