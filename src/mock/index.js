import {createRepository,seedData} from './repository.js';
import {domainPersistence} from './persistence.js';
export const repository=createRepository(domainPersistence.load()||seedData(),domainPersistence);
