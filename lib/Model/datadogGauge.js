class DatadogGauge {
    constructor(name, value, tags = [], timestamp ) {
    this.type = 3;
    this.value = value;
    this.tags = tags;
    this.timestamp = timestamp;
  }
}
