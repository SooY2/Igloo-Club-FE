import { Children, ReactNode, isValidElement, useState } from 'react';

interface FunnelProps<T extends readonly string[]> {
  step: T[number];
  children: ReactNode;
}

interface StepProps<T extends readonly string[]> {
  name: T[number];
  children?: ReactNode;
}

//step : 현재 활성화한 단계, children: 렌더링할 내부 컴포넌트
const Funnel = <T extends readonly string[]>({
  step,
  children,
}: FunnelProps<T>) => {
  const validElement = Children.toArray(children).filter(isValidElement);
  const targetElement = validElement.find(
    (child) => (child.props as StepProps<T>)?.name === step,
  );

  if (!targetElement) {
    return null;
  }

  return <>{targetElement}</>;
};

//각 단계의 컨텐츠 정의
const Step = <T extends readonly string[]>({ children }: StepProps<T>) => {
  return <>{children}</>;
};

const useFunnel = <T extends readonly string[]>(
  _steps: T,
  defaultStep: T[number],
) => {
  const [step, setStep] = useState(defaultStep);

  const FunnelElement = Object.assign(
    (props: Omit<FunnelProps<T>, 'step'>) => {
      return <Funnel step={step} {...props} />;
    },
    { Step: (props: StepProps<T>) => <Step<T> {...props} /> },
  );

  return [FunnelElement, setStep] as const;
};

export default useFunnel;
