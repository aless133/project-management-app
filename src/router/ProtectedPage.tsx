import React, { FC, useState } from 'react';
import { Spinner } from 'components/Spinner';
import { ProtectedRuleAuth } from './ProtectedRuleAuth';
import { ProtectedRuleBoardOwner } from './ProtectedRuleBoardOwner';
import { TProtectedRuleChecker } from 'types/protectedTypes';

interface IProtectedPageProps {
  rules: string[];
  component: React.ReactElement;
}
type TChecks = Record<string, boolean>;

export const ProtectedPage: FC<IProtectedPageProps> = ({ rules, component }) => {
  const checks0: TChecks = {};
  rules.forEach((item, i) => {
    checks0[item + '_' + i] = false;
  });
  const [checks, setChecks] = useState<TChecks>({ ...checks0 });
  // const checks: TChecks = {};

  const rulesElements: React.ReactElement[] = [];
  rules.forEach((item, i) => {
    const key = item + '_' + i;
    // const checker: TProtectedRuleChecker = (check) => {
    //   checks[key] = check;
    // };
    // console.log(checks[key]);
    const checker: TProtectedRuleChecker = (check) => {
      setChecks((state: TChecks) => (state[key] === check ? state : { ...state, [key]: check }));
    };
    if (item === 'user' || item === 'guest')
      rulesElements.push(<ProtectedRuleAuth key={key} userType={item} setCheck={checker} />);
    else if (item == 'boardOwner')
      rulesElements.push(<ProtectedRuleBoardOwner key={key} setCheck={checker} />);
  });

  return (
    <>
      {rulesElements}
      {Object.values(checks).every((v) => v) ? (
        component
      ) : (
        <main>
          <Spinner />
        </main>
      )}
    </>
  );
};
