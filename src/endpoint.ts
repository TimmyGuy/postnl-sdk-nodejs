export abstract class Endpoint {
    protected constructor() {
        this.registerDiscriminator()
    }
    abstract registerDiscriminator(): void
}