import { FunctionComponent } from 'react';
import { IService } from '../types';
import DynamicFaIcons from './DynamicFaIcons';

const ServiceCard: FunctionComponent<{ service: IService }> = ({
  service: { about, icon, name },
}) => {
  return (
    <div className='flex items-center p-2 space-x-4'>
      <DynamicFaIcons iconName={icon} />
      <div>
        <h1 className='font-bold'>{name}</h1>
        <h3>{about}</h3>
      </div>
    </div>
  );
};
export default ServiceCard;
