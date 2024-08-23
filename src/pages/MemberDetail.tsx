import { SetStateAction, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { getMemberById } from '../services/turso';
import { Member } from '../types';

const MemberDetail = () => {
  // Type the useParams hook
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();

  // Type the state with the Member type or null
  const [member, setMember] = useState<Member | null>(null);

  useEffect(() => {
    if (id) {
      getMemberById(id).then((data: SetStateAction<Member | null>) =>
        setMember(data)
      );
    }
  }, [id]);

  if (!member) return <p>{t('loading')}</p>;

  return (
    <div>
      <h1>{member.nickname}</h1>
      <p>
        {t('hours')}: {member.hours}
      </p>
      <p>
        {t('status')}: {member.status === 'online' ? t('online') : t('offline')}
      </p>
      <p>
        {t('spawners')}: {member.spawners}
      </p>
    </div>
  );
};

export default MemberDetail;
