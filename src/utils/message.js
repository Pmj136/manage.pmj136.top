const {Message} = ELEMENT;
export default {
    offset: 140,
    duration: 2000,
    errInstance: null,
    error(message) {
        this.createInstance('error', message)
    },
    info(message) {
        this.createInstance('info', message)
    },
    tip(message) {
        this.createInstance('success', message)
    },
    warn(message) {
        this.createInstance('warning', message)
    },
    createInstance(type, message) {
        if (this.errInstance) {
            this.errInstance.close()
            this.errInstance = null
        }
        if (this.errInstance == null) {
            this.errInstance = Message({
                type,
                message,
                offset: this.offset,
                duration:this.duration
            })
        }
    }
}