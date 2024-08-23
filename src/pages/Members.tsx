import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getMembers } from '../services/turso';
import { Member } from '../types';

const Members: React.FC = () => {
  const { t } = useTranslation();
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getMembers()
      .then((data) => setMembers(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>{t('loading')}</p>;
  if (error)
    return (
      <p>
        {t('error')}: {error}
      </p>
    );

  return (
    <div>
      <h1>{t('members')}</h1>
      <ul>
        {members.map((member) => (
          <li key={member.id}>
            <a href={`/members/${member.id}`}>{member.nickname}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Members;
