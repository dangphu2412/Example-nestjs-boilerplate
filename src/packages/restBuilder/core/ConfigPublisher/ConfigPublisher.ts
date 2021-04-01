import {Publisher} from '@packages/restBuilder/modules/Publisher/Publisher';
import {ConfigContext} from '@packages/restBuilder/modules/Context/ConfigContext';
import {BaseListener} from '@packages/restBuilder/modules/Listener/BaseListener';

export class ConfigPublisher implements Publisher {
    private context: ConfigContext = null;

    private listListener: typeof BaseListener[] = [];

    public addListener(listener: typeof BaseListener): this {
        this.listListener.push(listener);
        return this;
    }

    config(config: ConfigContext): this {
        this.context = config;
        this.publish();
        return this;
    }

    publish(): this {
        this.listListener.forEach(item => {
            item.receive(this.context);
        });
        return this;
    }

}
