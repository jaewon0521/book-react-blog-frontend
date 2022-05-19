import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, register } from '../../modules/auths';
import AuthForm from '../../components/auth/AuthForm';
import { check } from '../../modules/user';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState(null);

  const { form, auth, authError, user } = useSelector(({ auth,user }) => ({
    form: auth.register,
    auth: auth.auth,
    authError: auth.authError,
    user: user.user
  }));

  //인풋 변경 이벤트 핸들러
  const onChange = e => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'register',
        key: name,
        value
      })
    );
  };

  // 폼 등록 이벤트 핸들러
  const onSubmit = e => {
    e.preventDefault();
    const { userName, password, passwordConfirm } = form;

    if ([userName, password, passwordConfirm].includes('')) {
      setError('빈 칸을 모두 입력하세요');
      return;
    }

    if (password !== passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.');
      dispatch(changeField({ form: 'register', key: 'password', value: '' }));
      dispatch(changeField({ form: 'register', key: 'passwordConfirm', value: '' }));
      return;
    }

    dispatch(register({ userName, password }));
  };

  // 컴포넌트가 처음 렌더링 될 때 form 초기화
  useEffect(() => {
    dispatch(initializeForm('register'));
  }, [dispatch]);

  //회원가입 성공/실패 처리
  useEffect(() => {
    if (authError) {

      if (authError.response.status === 409) {
        setError('이미 존재하는 계정명입니다.');
        return
      }
      // 기타 이유
      setError('회원가입 실패');
      return;
    }

    if (auth) {
      console.log('회원가입 성공');
      console.log(auth);
      dispatch(check());
    }
  }, [auth, authError, dispatch]);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);

  return (
    <AuthForm
      type='register'
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
    );
};

export default RegisterForm;