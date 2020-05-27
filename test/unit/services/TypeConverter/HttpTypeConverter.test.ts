import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import HttpTypeConverter from '../../../../src/services/TypeConverter/HttpTypeConverter.ts';
import ITypeConverter from '../../../../src/services/TypeConverter/ITypeConverter.ts';

const test = Deno.test;

test('It should converter request body to type and remove none existant types', async () => {
    const expected = {
        name: 'anth',
        age: 23,
    } as TestType;

    const mockType = {
        ...expected,
        someExtraProperty: 'test'
    } as any;

    const converter: ITypeConverter = new HttpTypeConverter();

    const actual: TestType = await converter.convertToTypeAsync<TestType>(mockType, TestType);

    assertEquals(actual, expected);
});

test('It should converter request body to type and remove none existant types on more complex type', async () => {
    const expected = {
        values: ["res", "test"],
        person: {
            name: 'anth',
            age: 23
        },
    } as MoreComplexType;

    const mockType = {
        ...expected,
        someExtraProperty: 'test',
        blah: 1
    } as any;

    const converter: ITypeConverter = new HttpTypeConverter();

    const actual: MoreComplexType = await converter.convertToTypeAsync<MoreComplexType>(mockType, MoreComplexType);

    assertEquals(actual, expected);
});


class TestType {
    public name: string = '';
    public age: number = 0;
}

class MoreComplexType {
    public person: TestType = new TestType();
    public values: string[] = [];
}
