export const JwtConfig = {
    payload: {},
    options: {
        algorithm: 'RS256',
        issuer: 'TEST',
        audience: 'https://www.testing.com',
        expiresIn: '12h',
    },
};