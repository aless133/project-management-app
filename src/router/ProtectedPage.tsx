import React, { FC, useState, Suspense } from 'react';
// import React, { Suspense } from 'react';
import { Spinner } from 'components/UI/Spinner';
import { ProtectedRuleAuth } from './ProtectedRuleAuth';
import { ProtectedRuleBoardOwner } from './ProtectedRuleBoardOwner';
import { TProtectedRuleChecker } from 'types/protectedTypes';

interface IProtectedPageProps {
  rules: string[];
  component: React.ReactElement;
}
type TChecks = Record<string, boolean>;

const ProtectedPage: FC<IProtectedPageProps> = ({ rules, component }) => {
  const checks0: TChecks = {};
  rules.forEach((item, i) => {
    checks0[item + '_' + i] = false;
  });
  const [checks, setChecks] = useState<TChecks>({ ...checks0 });

  const rulesElements: React.ReactElement[] = [];
  rules.forEach((item, i) => {
    const key = item + '_' + i;
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
        <Suspense fallback={<Spinner />}>{component}</Suspense>
      ) : (
        <main>
          <Spinner />
        </main>
      )}
    </>
  );
};

export default ProtectedPage;
