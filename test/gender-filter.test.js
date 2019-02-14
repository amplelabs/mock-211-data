const dataLoader = require('../lib/data-loader')
const mockMeals = require('../mock-meals-50.json')
const meals = dataLoader.loadMeal(mockMeals)

describe('Filtering Mock Records based on gender info', () => {
  test('Return all mock records with gender information', () => {
    const expectedReords = [
      '35144-2', '35330-2', '35282-2', '35152-2', '35240-2',
      '35100-2', '35279-2', '35338-2',
      '35314-2', '35135-2'
    ].sort()
    const mealsWithGender = meals
      .filter(x => x.getGenderInfo() !== '')
      .map(y => y.getResourceId())
      .sort()

    expect(expectedReords).toEqual(mealsWithGender);
  })

  test('Return all mock records with female gender', () => {
    const expectedReords = [
      '35144-2', '35330-2', '35282-2', '35152-2', '35240-2'
    ].sort()
    const mealsWithFemaleGender = meals
      .filter(x => x.getGenderInfo().toLowerCase() === 'female')
      .map(y => y.getResourceId())
      .sort()

    expect(expectedReords).toEqual(mealsWithFemaleGender);
  })

  test('Return all mock records with male gender', () => {
    const expectedReords = [
      '35100-2', '35279-2', '35338-2'
    ].sort()
    const mealsWithMaleGender = meals
      .filter(x => x.getGenderInfo().toLowerCase() === 'male')
      .map(y => y.getResourceId())
      .sort()

    expect(expectedReords).toEqual(mealsWithMaleGender);
  })

  test('Return all mock records with *Other* gender', () => {
    const expectedReords = [
      '35314-2', '35135-2'
    ].sort()
    const mealsWithOtherGender = meals
      .filter(x => x.getGenderInfo().toLowerCase() === 'other')
      .map(y => y.getResourceId())
      .sort()

    expect(expectedReords).toEqual(mealsWithOtherGender);
  })

  test('Return all mock records with no gender info', () => {
    const expectedReords = [
      '35196-2',
      '35250-2',
      '35239-2',
      '35235-2',
      '35236-2',
      '35278-2',
      '35319-2',
      '35281-2',
      '35113-2',
      '35230-2',
      '35300-2',
      '35311-2',
      '35242-2',
      '35312-2',
      '35112-2',
      '35331-2',
      '35248-2',
      '35221-2',
      '35309-2',
      '35256-2',
      '35153-2',
      '35333-2',
      '35213-2',
      '35244-2',
      '35234-2',
      '35316-2',
      '35238-2',
      '35241-2',
      '35237-2',
      '35326-2',
      '35327-2',
      '35318-2',
      '35214-2',
      '35329-2',
      '35328-2',
      '35280-2',
      '35320-2',
      '35251-2',
      '35323-2',
      '35310-2' 
    ].sort()
    const mealsWithNoGenderInfo = meals
      .filter(x => x.getGenderInfo().toLowerCase() === '')
      .map(y => y.getResourceId())
      .sort()

    expect(expectedReords).toEqual(mealsWithNoGenderInfo);

  })
})