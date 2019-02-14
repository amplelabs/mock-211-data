const dataLoader = require('../lib/data-loader')
const mockMeals = require('../mock-meals-50.json')
const meals = dataLoader.loadMeal(mockMeals)

describe('Filtering Mock Records based on ago info', () => {
  test('Return all mock records with age information', () => {
    const expectedReords = [
      '35311-2', '35244-2', '35230-2', '35237-2', '35152-2',
      '35300-2', '35278-2', '35312-2',
      '35279-2', '35318-2'
    ].sort()
    const mealsWithAge = meals
      .filter(x => x.getAgeInfo().length !== 0)
      .map(y => y.getResourceId())
      .sort()

    expect(expectedReords).toEqual(mealsWithAge);
  })

  test.each([[15], [16], [17], [18], [19]])
  ('Return all mock records with age between 15 and 20, not incluing 20', (age) => {
    const expectedReords = [
      '35311-2', '35244-2', '35230-2', '35237-2', '35152-2'
    ].sort()
    const mealsWithAge15to20 = meals
      .filter(x => x.isBetweenAgeLimit(age))
      .map(y => y.getResourceId())
      .sort()
    expect(expectedReords).toEqual(mealsWithAge15to20);
  })

  test.each([[20], [21], [22], [23]])
  ('Return all mock records with age between 20 and 24, not including 24', (age) => {
    const expectedReords = [
      '35311-2', '35244-2', '35230-2', '35237-2', '35152-2',
      '35300-2', '35278-2', '35312-2'
    ].sort()
    const mealsWithAge20to24 = meals
      .filter(x => x.isBetweenAgeLimit(age))
      .map(y => y.getResourceId())
      .sort()
    expect(expectedReords).toEqual(mealsWithAge20to24);
  })

  test.each([[24], [34], [49], [64]])
  ('Return all mock records with age between 24 and 65, not including 65', (age) => {
    const expectedReords = [
      '35300-2', '35278-2', '35312-2',
    ].sort()
    const mealsWithAge20to24 = meals
      .filter(x => x.isBetweenAgeLimit(age))
      .map(y => y.getResourceId())
      .sort()
    expect(expectedReords).toEqual(mealsWithAge20to24);
  })

  test.each([[65], [71], [84], [90]])
  ('Return all mock records with age above 65', (age) => {
    const expectedReords = [
      '35300-2', '35278-2', '35312-2',
      '35279-2', '35318-2'
    ].sort()
    const mealsWithAge65Up = meals
      .filter(x => x.isBetweenAgeLimit(age))
      .map(y => y.getResourceId())
      .sort()
    expect(expectedReords).toEqual(mealsWithAge65Up);
  })

  test('Return all mock records with no age information', () => {
    const expectedReords = [
      '35196-2',
      '35250-2',
      '35239-2',
      '35314-2',
      '35235-2',
      '35236-2',
      '35319-2',
      '35282-2',
      '35281-2',
      '35113-2',
      '35242-2',
      '35338-2',
      '35112-2',
      '35331-2',
      '35248-2',
      '35240-2',
      '35221-2',
      '35309-2',
      '35256-2',
      '35153-2',
      '35333-2',
      '35213-2',
      '35234-2',
      '35144-2',
      '35100-2',
      '35316-2',
      '35330-2',
      '35238-2',
      '35241-2',
      '35326-2',
      '35327-2',
      '35214-2',
      '35329-2',
      '35328-2',
      '35280-2',
      '35320-2',
      '35251-2',
      '35323-2',
      '35135-2',
      '35310-2'
    ].sort()

    const mealsWithNoAgeInfo = meals
      .filter(x => x.getAgeInfo().length === 0)
      .map(y => y.getResourceId())
      .sort()

    expect(expectedReords).toEqual(mealsWithNoAgeInfo);
  })
})