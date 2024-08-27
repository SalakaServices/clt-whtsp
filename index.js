require('./client');

require('./clt/event-handlers/init');
require('./clt/event-handlers/message');
require('./clt/event-handlers/send');
require('./clt/event-handlers/vote');

require('./api-client/server');
require('./api-client/controllers/messageController');
require('./api-client/routes/messageRoutes');