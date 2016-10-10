export class UniversalizedFormPrototype {
    public form: any;

    edit(entity: any) {
        return this.form && this.form.edit(entity);
    }
    clear() {
        return this.form && this.form.clear();
    }
}
