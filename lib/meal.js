const moment = require('moment-timezone')
const haversine = require('haversine')

class Meal {
  static fromJson (orgInfo) {
    return orgInfo.meals
      .map((meal) => new Meal(Object.assign({}, orgInfo, meal)))
  }
  constructor (m) {
    this.address = m.address
    this.organizationName = m.organizationName
    this.program = m.program
    this.startTime = m.startTime
    this.endTime = m.endTime
    this.dayOfWeek = m.dayOfWeek
    this.type = m.type
    this.notes = m.notes
    this.latitude = m.latitude
    this.longitude = m.longitude
    this.gender = m.gender
    this.age = m.age
    this.race = m.race
    this.distance = m.distance
    this.toMealStartTime = m.toMealStartTime
    this.toMealEndTime = m.toMealEndTime
    this.resourceId = m.resourceId // added
  }

  getResourceId () {
    return this.resourceId
  }

  getGenderInfo () {
    return this.gender
  }

  getAgeInfo() {
    // TODO: make sure age[0] is min and age[1] is max
    return Array.isArray(this.age) ? this.age : []
  }

  isBetweenAgeLimit(age) {
    const ageLimit = this.getAgeInfo()
    if (ageLimit.length === 0) return false
    const [min, max] = ageLimit
    return (age >= min) && (age < max)
  }

  addDistanceFrom (location) {
    this.location = location
    this.distance = haversine(location, this, {unit: 'meter'})
  }

  // add 'time distance here'
  addTimeMetrics(timeIn) {
    if (timeIn === null || timeIn === undefined) {
      // use meal start and end time instead
      // undefined / null for toMealStartTime / toMealEndTime indicated no meal found
      this.toMealStartTime = null
      this.toMealEndTime = null
      return null
    }
    // put output in mins
    const msecToMin = 1.0 / 1000.0 / 60.0 
    const now = ((t) => {
      const tmp = moment(t,'HH:mm').tz("America/Toronto")
      // console.log(tmp.isValid())
      // console.log(tmp.format("HH:mm"))
      if (!tmp.isValid()) {
        return moment().tz("America/Toronto") // make a global constant js file for this
      }
      return tmp
    })(timeIn)
    // console.log(moment(this.startTime,"HH:mm").tz("America/Toronto").format("HH:mm"))
    // console.log(moment(this.endTime,"HH:mm").tz("America/Toronto").format("HH:mm"))
    // console.log(now.tz("America/Toronto").format("HH:mm"))
    this.toMealStartTime = Math.floor(moment(this.startTime,"HH:mm").tz("America/Toronto").diff(now) * msecToMin)
    this.toMealEndTime = Math.floor(moment(this.endTime,"HH:mm").tz("America/Toronto").diff(now) * msecToMin)

    // console.log(`startin: ${this.toMealStartTime}`)
  }

  startsIn() {
    return this.toMealStartTime
  }

  endsIn() {
    return this.toMealEndTime
  }

  startsInText() {
    if (this.toMealStartTime === null || this.toMealStartTime === undefined) {
      return null
    }

    if (this.toMealStartTime > 0) {
      if (this.toMealStartTime < 59) {
        return `is starting in ${this.toMealStartTime} min`
      } else {
        return `is starting in ${Math.floor(this.toMealStartTime / 60.0)} hr and ${Math.floor(this.toMealStartTime % 60.0)} min`
      }
    }
    else {
      return `started ${-this.toMealStartTime} min ago`
    } 
  }

  endsInText() {
    if (this.toMealEndTime === null || this.toMealEndTime === undefined) {
      return null
    }
    if (this.toMealEndTime > 0 && this.toMealEndTime < 59) {
      return `finishing in ${this.toMealEndTime} min`
    } else {
      return `finishing in ${Math.floor(this.toMealEndTime / 60.0)} hr and ${Math.floor(this.toMealEndTime % 60.0)} min`
    }
  }

  walkTime() {
    const avgWalkingSpeed = 1.3 // m/sec (see google)
    return Math.ceil(this.distance * avgWalkingSpeed / 60.0)
  }

  walkTimeText() {
    return `${this.walkTime()} min`
  }
}

module.exports = Meal
