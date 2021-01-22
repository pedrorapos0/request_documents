import { getRepository } from 'typeorm';
import User from '../models/User';

interface RequestData {
  name: string;
  email: string;
  departament: string;
}

class createUserService {
  public async execute({
    name,
    departament,
    email,
  }: RequestData): Promise<User> {
    const userRepository = getRepository(User);
    const userExist = await userRepository.findOne({ email });
    if (userExist) {
      return userExist;
    }
    const user = userRepository.create({ name, departament, email });
    await userRepository.save(user);
    return user;
  }
}

export default createUserService;
