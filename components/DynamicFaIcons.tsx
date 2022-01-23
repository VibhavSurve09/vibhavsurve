import { FunctionComponent } from 'react';
import * as Icons from 'react-icons/fa';

const DynamicFaIcons: FunctionComponent<{ iconName: string }> = ({
  iconName,
}) => {
  const IconComponent = Icons[iconName];
  return <IconComponent className='w-12 h-12 text-green' />;
};
export default DynamicFaIcons;
