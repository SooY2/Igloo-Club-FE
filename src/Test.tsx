interface IPerson {
  name: string;
  age: number;
}

const Test = () => {
  const greet = (person: IPerson) => {
    console.log(`Hello, ${person.name}`);
  };

  const person = {
    name: 'John',
    age: 30,
  };

  greet(person);

  const sum = (a: number, b: number) => a + b;

  console.log(sum(5, 10));

  return <div>Test</div>;
};

export default Test;
