/**
 * Environment Variable Validator
 * Ensures all critical environment variables are properly configured
 */

const validateEnvironment = () => {
    const errors = [];
    const warnings = [];

    // Critical security variables
    const criticalVars = {
        JWT_SECRET: {
            required: true,
            minLength: 32,
            description: 'JWT signing secret for authentication tokens'
        },
        MONGODB_URI: {
            required: true,
            description: 'MongoDB connection string'
        }
    };

    // Important but not critical variables
    const importantVars = {
        EMAIL_USER: {
            required: false,
            description: 'Gmail account for sending emails'
        },
        EMAIL_PASS: {
            required: false,
            description: 'Gmail app password for email authentication'
        },
        GOOGLE_CLIENT_ID: {
            required: false,
            description: 'Google OAuth client ID'
        },
        GOOGLE_CLIENT_SECRET: {
            required: false,
            description: 'Google OAuth client secret'
        }
    };

    // Check critical variables
    for (const [varName, config] of Object.entries(criticalVars)) {
        const value = process.env[varName];

        if (!value) {
            errors.push(`❌ ${varName}: ${config.description} - REQUIRED but not set`);
        } else if (config.minLength && value.length < config.minLength) {
            errors.push(`❌ ${varName}: Too short (${value.length}/${config.minLength} chars) - ${config.description}`);
        }
    }

    // Check important variables
    for (const [varName, config] of Object.entries(importantVars)) {
        const value = process.env[varName];

        if (!value && config.required) {
            errors.push(`❌ ${varName}: ${config.description} - REQUIRED but not set`);
        } else if (!value) {
            warnings.push(`⚠️  ${varName}: ${config.description} - Not set (optional)`);
        }
    }

    // Environment-specific checks
    if (process.env.NODE_ENV === 'production') {
        if (process.env.JWT_SECRET && process.env.JWT_SECRET.length < 64) {
            errors.push('❌ JWT_SECRET: Production requires at least 64 characters for security');
        }

        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            warnings.push('⚠️  Email service not configured - email verification will not work');
        }
    }

    // Display results
    if (errors.length > 0) {
        console.error('\n🚨 CRITICAL ENVIRONMENT CONFIGURATION ERRORS:');
        errors.forEach(error => console.error(error));
        console.error('\n💡 Please fix these issues before starting the application.');
        console.error('📖 Refer to ENVIRONMENT_SETUP.md for configuration details.');

        if (process.env.NODE_ENV === 'production') {
            console.error('\n🚨 PRODUCTION ENVIRONMENT: Exiting due to configuration errors');
            process.exit(1);
        } else {
            console.error('\n⚠️  Development mode: Continuing with errors (NOT RECOMMENDED)');
        }
    }

    if (warnings.length > 0) {
        console.warn('\n⚠️  ENVIRONMENT CONFIGURATION WARNINGS:');
        warnings.forEach(warning => console.warn(warning));
        console.warn('\n💡 These warnings may affect application functionality.');
    }

    if (errors.length === 0 && warnings.length === 0) {
        console.log('✅ Environment configuration validated successfully');
    }

    return { errors, warnings };
};

module.exports = { validateEnvironment };
